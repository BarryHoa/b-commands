# Features

## Git Delete Local Branches That Are Not In Remote

`Git Delete Local Branches That Are Not In Remote` is a Visual Studio Code extension that helps you easily delete local branches that no longer exist on the remote repository. This extension keeps your branch list clean and more manageable.
The extension executes the following commands in the terminal:

1. `git fetch -p`: Fetches the latest information from the remote and removes branches that have been deleted on the remote.
2. `git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -D`: Finds and deletes local branches that no longer exist on the remote.
