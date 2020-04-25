var V = 0; //no. of vertices

function minKey (key, mstSet) {
  // Initialize min value
  min = 9999;
  min_index = -1;

  for (v = 0; v < V; v++)
    if (mstSet[v] == false && key[v] < min) {
      min = key[v];
      min_index = v;
    }

  return min_index;
}

function printMST (parent, graph) {
  console.log ('Edge \tWeight');
  for (i = 1; i < V; i++)
    console.log (parent[i] + ' - ' + i + '\t' + graph[i][parent[i]]);
}

function primMST (graph,callback) {
  // Array to store constructed MST
  parent = [];

  // Key values used to pick minimum weight edge in cut
  key = [];

  // To represent set of vertices not yet included in MST
  mstSet = [];

  // Initialize all keys as INFINITE
  for (i = 0; i < V; i++) {
    key.push (99999);
    mstSet.push (false);
  }

  // Always include first 1st vertex in MST.
  key[0] = 0; // Make key 0 so that this vertex is picked as first vertex
  parent[0] = -1; // First node is always root of MST

  // The MST will have V vertices
  for (count = 0; count < V - 1; count++) {
    // Pick thd minimum key vertex from the set of vertices
    // not yet included in MST
    u = minKey (key, mstSet);

    // Add the picked vertex to the MST Set
    mstSet[u] = true;

    // Update key value and parent index of the adjacent
    // vertices of the picked vertex. Consider only those
    // vertices which are not yet included in MST
    for (v = 0; v < V; v++)
      // graph[u][v] is non zero only for adjacent vertices of m
      // mstSet[v] is false for vertices not yet included in MST
      // Update the key only if graph[u][v] is smaller than key[v]
      if (graph[u][v] != 0 && mstSet[v] == false && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
  }

  callback(parent,graph);
  // print the constructed MST
  printMST (parent, graph);
}

function main (inp_graph, vertices,callback) {
  V = vertices;
  graph = inp_graph;
  primMST (graph,callback);
}
