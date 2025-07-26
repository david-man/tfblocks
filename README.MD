# tfblocks-main

This is tfblocks's Web repository(the main one -- tfblocks.vercel.app)! While tfBlocks's web version is more for experimentation, tfBlocks' Desktop companion is designed for real world machine learning projects. Feel free to follow the instructions below to tinker with the web version.

# Core Methodologies

tfBlocks's frontend mainly runs on ReactFlow, a library specifically designed for graphs.

Of course, ReactFlow doesn't come with native support for directed acyclic graphs / DAG(which are, in essence, what all neural networks are!). Thus, parsing the graphs and keeping them valid is no easy task. Most of the heavy lifting was done using BFS. Layer runtime scheduling, which tells the backend in what order in which to actually compile the layers, was done with BFS. DAG validation, which prevents users from created loops, was also done using BFS.

On the backend, Keras's functional API was used to generate the models. Compilation was done by populating a dictionary of Keras tensor outputs in just the right order such that no layer compiled before a parent or after a dependent. This was particularly difficult to do with the custom RNN heads, which is unfortunate given that they don't transfer well between machines.

If anything, though, this project taught me the most about large project development. I admit that the codebase is extremely messy. I admit that there are unnecessary states that I hold and update. But I hope to improve in the future!

## Project Setup

### Install

```bash
$ git clone https://github.com/david-man/tfblocks-main
$ npm install
$ cd ./tfblocks-backend
$ pip3 install requirements.txt
```

### Use
For the frontend
```bash
$ cd ./tfblocks-frontend
$ npm run dev
```

For the backend
```bash
$ cd ./tfblocks-backend
$ python3 main.py --dev
```

