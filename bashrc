export READER=zathura

# Useful ergos
alias ls="ls -G"
alias la="ls -laG"

alias l="ls -1G"
alias ll="ls -1aG"

## Functions

# Inject git branch into PS1 if dir contains a `.git` directory
function g() { git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'; }

# Start a jupyter lab in the cwd
function jnb { jupyter notebook; }

# Download a yt vid with the best quality in mp4
function ytv { yt-dlp -f 22 "$1"; }

#setopt prompt_subst
export PS1='[\e[1;34m\w\e[0m\e[1;35m$(g)\e[0m] λ '

