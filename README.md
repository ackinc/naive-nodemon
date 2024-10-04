Basic idea:

- `fs.watch` to check for file changes
- start target program as a child process, with inherited stdio
- kill child process and restart on file changes

Questions:

- pros and cons of spawning a new shell (cp.exec vs cp.execFile) for the child?
- why even bother with cp.exec/cp.execFile when there's cp.spawn?
