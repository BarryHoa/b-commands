# bcommands README

This is the README for your extension "bcommands". After writing up a brief description, we recommend including the following sections.

## Features

# Git Delete Local Branches That Are Not In Remote

## Introduction

`Git Delete Local Branches That Are Not In Remote` is a Visual Studio Code extension that helps you easily delete local branches that no longer exist on the remote repository. This extension keeps your branch list clean and more manageable.

## Features

- Automatically deletes local branches that no longer exist on the remote.
- Simple and user-friendly interface.
- Seamlessly integrates with Git in VSCode.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions section (or press `Ctrl+Shift+X`).
3. Search for `Git Delete Local Branches That Are Not In Remote`.
4. Click the `Install` button to install the extension.

## Usage

1. Open the Command Palette by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS).
2. Type `Remove Branches Not in Remote` and select the command from the list.
3. The extension will automatically delete local branches that no longer exist on the remote.

## How It Works

The extension executes the following commands in the terminal:

1. `git fetch -p`: Fetches the latest information from the remote and removes branches that have been deleted on the remote.
2. `git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -D`: Finds and deletes local branches that no longer exist on the remote.
