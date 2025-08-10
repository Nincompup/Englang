#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#include <unordered_set>
using namespace std;

vector<int> bfs(int start, int N, const vector<vector<int>>& adj) {
    vector<int> dist(N + 1, INT_MAX);
    queue<int> q;
    dist[start] = 0;
    q.push(start);
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (dist[v] == INT_MAX) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

int solve(int N, int K, vector<int>& special_nodes, vector<int>& node_from, vector<int>& node_to) {
    // Build adjacency list
    vector<vector<int>> adj(N + 1);
    for (int i = 0; i < N - 1; ++i) {
        int u = node_from[i];
        int v = node_to[i];
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    // Get distances from node 1 and node N
    vector<int> dist1 = bfs(1, N, adj);
    vector<int> distN = bfs(N, N, adj);
    
    // Original distance without any operation
    int original_dist = dist1[N];
    
    // Collect distances of special nodes from 1 and N
    vector<pair<int, int>> special_dist;
    unordered_set<int> special_set(special_nodes.begin(), special_nodes.end());
    
    for (int node : special_nodes) {
        special_dist.emplace_back(dist1[node], distN[node]);
    }
    
    // Find the minimal possible distance by connecting two special nodes
    int min_dist = original_dist;
    
    // Find the minimal (dist1[u] + distN[v] + 1)
    int min_u = INT_MAX;
    int min_v = INT_MAX;
    
    for (auto [d1, dn] : special_dist) {
        min_u = min(min_u, d1);
        min_v = min(min_v, dn);
    }
    
    int candidate = min_u + min_v + 1;
    min_dist = min(min_dist, candidate);
    
    return min_dist;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int T;
    cin >> T;
    
    while (T--) {
        int N, K;
        cin >> N >> K;
        
        vector<int> special_nodes(K);
        for (int i = 0; i < K; ++i) {
            cin >> special_nodes[i];
        }
        
        vector<int> node_from(N - 1);
        vector<int> node_to(N - 1);
        
        for (int i = 0; i < N - 1; ++i) {
            cin >> node_from[i];
        }
        
        for (int i = 0; i < N - 1; ++i) {
            cin >> node_to[i];
        }
        
        cout << solve(N, K, special_nodes, node_from, node_to) << '\n';
    }
    
    return 0;
}