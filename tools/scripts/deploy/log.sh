# Set Colors
if [[ "${TERM}" == "xterm"* ]]; then
  bold=$(tput bold)
  underline=$(tput sgr 0 1)
  reset=$(tput sgr0)
  purple=$(tput setaf 171)
  red=$(tput setaf 1)
  green=$(tput setaf 76)
  yellow=$(tput setaf 3)
  blue=$(tput setaf 38)
else
  bold="\e[1m"
  underline="\e[4m"
  reset="\e[0m"
  purple="\e[95m"
  red="\e[31m"
  green="\e[32m"
  yellow="\e[33m"
  blue="\e[34"
fi

function _alert() {
    if [ "${1}" = "error" ]; then local color="${bold}${red}"; fi
    if [ "${1}" = "warning" ]; then local color="${yellow}"; fi
    if [ "${1}" = "success" ]; then local color="${green}"; fi
    if [ "${1}" = "debug" ]; then local color="${purple}"; fi
    if [ "${1}" = "header" ]; then local color="${bold}""${green}"; fi
    if [ "${1}" = "info" ]; then local color=""; fi

    echo -e "${color}${_message}${reset}";
    # echo -e "${color}$(printf "[%7s]" "${1}") ${_message}${reset}";
}

function log_error ()     { local _message="${*}"; echo "$(_alert error)"; }
function log_warning ()   { local _message="${*}"; echo "$(_alert warning)"; }
function log_info ()      { local _message="${*}"; echo "$(_alert info)"; }
function log_debug ()     { local _message="${*}"; echo "$(_alert debug)"; }
function log_success ()   { local _message="${*}"; echo "$(_alert success)"; }
function log_header()     { local _message="========== ${*} ==========  "; echo "$(_alert header)"; }

# Log messages when verbose is set to "true"
verbose() {
  if [[ "${verbose}" = "true" ]] || [ "${verbose}" == "1" ]; then
    log_debug "$@"
  fi
}
