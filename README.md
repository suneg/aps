# Aws Profile Switch                                                                                                                                                      

A small deno-based command line tool for quickly switching between AWS profiles. Works by substituting which of your profiles defined in ~/.aws/credentials is the        default one.

# Prerequisites
Deno runtime required. Get it from https://deno.land

## Setup
```bash
git clone https://github.com/suneg/aps ~/.aps
```

Add the following line to your ~/.bashrc
```bash
export PATH="$PATH:~/aps/bin"
```


## Usage - switching between profiles
```bash
$ aps personal
Current AWS profile: personal

$ aps
  terraformtest
* personal
  githubcli
```
