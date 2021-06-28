const { pixelsToRem } = require('./tools/styling/pixelsToRem')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './apps/**/*.{ts,tsx}',
      './libs/checkout-shared/src/lib/*.{ts,tsx}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundImage: () => ({
      main:
        "url('https://publish-p24061-e70035.adobeaemcloud.com/etc.clientlibs/abcam/clientlibs/clientlib-react/resources/b0ecb3400f5a163096285fe20a7cb447.svg')",
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
    }),
    backgroundSize: {
      main: '5rem',
    },
    extend: {
      border: {
        DEFAULT: '1px',
      },
      borderRadius: {
        '4px': '4px',
        DEFAULT: '10px',
        sm: '16px',
        lg: '28px',
        none: '0',
        '8px': '8px',
        '72px': '72px',
      },
      boxShadow: {
        'elevation-1': '0 2px 4px 0 rgba(39, 63, 63, 0.1)',
        'elevation-2': '0 3px 8px 0 rgba(39, 63, 63, 0.11)',
        'elevation-3': '0 6px 12px 0 rgba(39, 63, 63, 0.12)',
        'elevation-4': '0 12px 16px 0 rgba(39, 63, 63, 0.15)',
        'elevation-5': '0 16px 32px 0 rgba(39, 63, 63, 0.2)',
        interactiveElement: '0 0 0 3px #17c67e',
        'interactiveElement-small': '0 0 0 1px #17c67e',
      },
      borderWidth: {
        '1_2': '1.5px',
      },
      padding: {
        '1_1': '1.1rem',
        '1_2': '1.2rem',
        '1_5': '1.5rem',
        '2_2': '2.2rem',
        '2%': '2%',
        '5%': '5%',
      },
      colors: {
        // https://www.color-blindness.com/color-name-hue/
        black: '#000000',
        blue: '#0044b2',
        red: '#d43737',
        cross: '#de7885',
        backgroundLightbox: 'rgba(39, 63, 63, 0.2)',
        buttonPrimary: '#0047bb',
        buttonPrimaryHover: '#0845a2',
        buttonPrimaryCount: '#0d45a3',
        buttonSecondaryHover: '#344c4c',
        buttonQuaternary: '#f0f3f3',
        buttonQuaternaryHover: '#dce0e0',
        interactiveBlueActive: '#104489',
        interactiveGreyDarkActive: '#2c4444',
        interactiveWhiteTransparentActive: 'rgba(255, 255, 255, 0.1)',
        interactiveGreyTransparentActive: 'rgba(39, 63, 63, 0.1)',
        interactiveGreyTransparentHover: 'rgba(39, 63, 63, 0.05)',
        green35: '#13a066',
        green40: '#1aab71',
        green45: '#17c67e',
        grey10: '#c4c4c4',
        grey20: '#273f3f',
        grey35: '#405959',
        grey60: '#919d9d',
        grey80: '#c9cfcf',
        grey90: '#e4e7e7',
        grey95: '#f1f3f3',
        greydark: '#869393',
        pink: '#a4207f',
        strokeDarkBGMedium: 'rgba(255, 255, 255, 0.2)',
        zircon: '#eaecec',
        white: '#fff',
      },
      fill: (theme) => ({
        imageSliderButton: theme('colors.grey95'),
        white: theme('colors.white'),
        red: '#D43737',
        cross: theme('colors.cross'),
        crossGrey: theme('colors.grey60'),
        green: theme('colors.green35'),
        pink: theme('colors.pink'),
      }),
      fontFamily: {
        regular: ['Eina03-Regular', 'Ariel', 'sans-serif'],
        sb: ['Eina03-Semibold', 'Ariel', 'sans-serif'],
      },
      fontSize: {
        'heading-xxxlarge': [
          pixelsToRem(72),
          {
            letterSpacing: pixelsToRem(-1),
            lineHeight: 1,
          },
        ],
        'heading-xxlarge': [
          pixelsToRem(56),
          {
            letterSpacing: pixelsToRem(-2),
            lineHeight: 1,
          },
        ],
        'heading-xlarge': [
          pixelsToRem(40),
          {
            letterSpacing: pixelsToRem(-1),
            lineHeight: 1.1,
          },
        ],
        'heading-large': [
          pixelsToRem(32),
          {
            letterSpacing: pixelsToRem(-1),
            lineHeight: 1.25,
          },
        ],
        'heading-medium': [
          pixelsToRem(24),
          {
            letterSpacing: pixelsToRem(-0.5),
            lineHeight: 1.33,
          },
        ],
        'heading-small': [
          pixelsToRem(21),
          {
            lineHeight: 1.29,
          },
        ],
        'body-large': [
          pixelsToRem(18),
          {
            lineHeight: 1.5,
          },
        ],
        'body-medium': [
          pixelsToRem(16),
          {
            lineHeight: 1.5,
          },
        ],
        'body-small': [
          pixelsToRem(12),
          {
            letterSpacing: pixelsToRem(0.5),
            lineHeight: 1.5,
          },
        ],
        'ui-large': [
          pixelsToRem(16),
          {
            letterSpacing: pixelsToRem(0.5),
            lineHeight: 1.5,
          },
        ],
        'ui-medium': [
          pixelsToRem(12),
          {
            letterSpacing: pixelsToRem(0.5),
            lineHeight: 1.67,
          },
        ],
        'ui-small': [
          pixelsToRem(12),
          {
            letterSpacing: 'normal',
            lineHeight: 1.33,
          },
        ],
        'button-small': [
          pixelsToRem(10),
          {
            letterSpacing: 'normal',
            lineHeight: 1.33,
          },
        ],
      },
      flex: {
        0.1: '0.1',
        0.2: '0.2',
        0.3: '0.3',
        0.5: '0.5',
        0.7: '0.7',
        2: '2',
        3: '3',
        4: '4',
        20: '20',
      },
      gridTemplateColumns: {
        pdpCols: 'auto 1fr',
        pdpDataSheetTable: '16.66666667% 1fr 1fr',
        pdpTabs: '1fr auto',
      },
      height: {
        '8rem': '8rem',
        pdpContactDistributorModal: '550px',
      },
      inset: {
        initial: 'initial',
        100: '100px',
      },
      lineHeight: {
        11: '3rem',
      },
      margin: {
        smSlider: '0.625rem',
        mdSlider: '5.625rem',
        searchSuggestions: '170px',
        smSearchSuggestions: '17px',
      },
      maxWidth: {
        400: '400px',
        initial: 'initial',
        desktop: '1280px',
      },
      maxHeight: {
        25.625: '25.625rem',
      },
      minHeight: {
        pdpTabs: '40px',
      },
      spacing: {
        104: '26rem',
        120: '30rem',
        136: '34rem',
      },
      scale: {
        70: '.70',
        80: '.80',
      },
      screens: {
        xs: '530px',
        sm: '680px',
        md: '800px',
        lg: '960px',
        tyu: '476px',
        smu: '641px',
        mdu: '769px',
        lgu: '1025px',
        xlu: '1281px',
        xld: { max: '1280px' },
        lgd: { max: '1024px' },
        mdd: { max: '768px' },
        smd: { max: '640px' },
        tyd: { max: '475px' },
      },
      tracking: {
        letterSpacing: '-1px',
      },
      width: {
        initial: 'initial',
        pdpContactDistributorModal: '500px',
      },
      zIndex: {
        hidden: '-1',
        feedbackPanel: '1',
        pdpTabs: '1',
        aboutDisclaimer: '2',
        searchCategoryResult: '3',
        previousSearches: '4',
        searchMiddle: '5',
        footer: '7',
        drawer: '8',
        search: '9',
        modal: '10',
        modelZElement: '11',
        autoSuggestionTerm: '-1',
        suggestionsWrapper: '6',
        imageOverlay: '13',
        searchWrapper: '12',
        modalOverlay: '13',
        homepage: '0',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
