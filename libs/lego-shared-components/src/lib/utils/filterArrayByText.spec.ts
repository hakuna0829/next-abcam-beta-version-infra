import { filterArrayByText } from '@abcam-web/lego-shared-components/lib/utils/filterArrayByText'

describe('The filterArrayByText function', () => {
  describe('When called with an array of strings', () => {
    it('Returns the entries that include the search keyword at the beginning', () => {
      const data = ['after', 'before', 'currently']
      const res = filterArrayByText(data, 'a')
      expect(res).toEqual(['after'])
    })

    it('Returns the entries that include the search keyword at the end', () => {
      const data = ['bbbbba', 'bbbbb', 'ccccc']
      const res = filterArrayByText(data, 'a')
      expect(res).toEqual(['bbbbba'])
    })

    it('Returns the entries that include the search keyword anywhere', () => {
      const data = ['bbbbfghbbb', 'bbbbb', 'ccccc']
      const res = filterArrayByText(data, 'fgh')
      expect(res).toEqual(['bbbbfghbbb'])
    })

    it('Returns all the entries', () => {
      const data = ['aaayz', 'bbyzbb', 'ccc']
      const res = filterArrayByText(data, 'yz')
      expect(res).toEqual(['aaayz', 'bbyzbb'])
    })

    it('Works with sentences', () => {
      const data = ['A new hope', 'the empire strikes back', 'the clone wars']
      const res = filterArrayByText(data, 'the')
      expect(res).toEqual([data[1], data[2]])
    })

    it('Ignores the letter case in the list', () => {
      const data = ['A new hope', 'The empire strikes back', 'The clone wars']
      const res = filterArrayByText(data, 'the')
      expect(res).toEqual([data[1], data[2]])
    })

    it('Ignores the letter case in the search keyword', () => {
      const data = ['A new hope', 'the empire strikes back', 'The clone wars']
      const res = filterArrayByText(data, 'The')
      expect(res).toEqual([data[1], data[2]])
    })

    describe('And when a filterKey is specified', () => {
      it('Throws an error', () => {
        const data = ['A new hope', 'The empire strikes back', 'The clone wars']
        expect(() => filterArrayByText(data, 'the', 'test')).toThrow()
      })
    })
  })

  describe('When called with an array of objects', () => {
    it('Returns the entries that include the search keyword at the beginning', () => {
      const data = [
        { myKey: 'after' },
        { myKey: 'before' },
        { myKey: 'currently' },
      ]
      const res = filterArrayByText(data, 'a', 'myKey')
      expect(res).toEqual([data[0]])
    })

    it('Returns the entries that include the search keyword at the end', () => {
      const data = [{ myKey: 'bbbbba' }, { myKey: 'bbbbb' }, { myKey: 'ccccc' }]
      const res = filterArrayByText(data, 'a', 'myKey')
      expect(res).toEqual([data[0]])
    })

    it('Returns the entries that include the search keyword anywhere', () => {
      const data = [
        { myKey: 'bbbbfghbbb' },
        { myKey: 'bbbbb' },
        { myKey: 'ccccc' },
      ]
      const res = filterArrayByText(data, 'fgh', 'myKey')
      expect(res).toEqual([data[0]])
    })

    it('Returns all the entries', () => {
      const data = [{ myKey: 'aaayz' }, { myKey: 'bbyzbb' }, { myKey: 'ccc' }]
      const res = filterArrayByText(data, 'yz', 'myKey')
      expect(res).toEqual([data[0], data[1]])
    })

    it('Works with sentences', () => {
      const data = [
        { myKey: 'A new hope' },
        { myKey: 'the empire strikes back' },
        { myKey: 'the clone wars' },
      ]
      const res = filterArrayByText(data, 'the', 'myKey')
      expect(res).toEqual([data[1], data[2]])
    })

    it('Ignores the letter case in the list', () => {
      const data = [
        { myKey: 'A new hope' },
        { myKey: 'the empire strikes back' },
        { myKey: 'the clone wars' },
      ]
      const res = filterArrayByText(data, 'the', 'myKey')
      expect(res).toEqual([data[1], data[2]])
    })

    it('Ignores the letter case in the search keyword', () => {
      const data = [
        { myKey: 'A new hope' },
        { myKey: 'the empire strikes back' },
        { myKey: 'The clone wars' },
      ]
      const res = filterArrayByText(data, 'The', 'myKey')
      expect(res).toEqual([data[1], data[2]])
    })

    describe('And when a filterKey is NOT specified', () => {
      it('Throws an error', () => {
        const data = [
          { myKey: 'A new hope' },
          { myKey: 'the empire strikes back' },
          { myKey: 'the clone wars' },
        ]
        expect(() => filterArrayByText(data, 'the')).toThrow()
      })
    })
  })
})
