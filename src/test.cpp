#include <bits/stdc++.h>
using namespace std;

#define ll long long
const ll MOD = 1000000007;

int main(){
    int N;
    cin >> N;
    vector<vector<int>> A(N, vector<int>(N));
    ll blocked_count = 0;
    for(int i = 0; i < N; i++){
        for(int j = 0; j < N; j++){
            cin >> A[i][j];
            if (A[i][j] == -1) blocked_count++;
        }
    }

    // 1) flood-fill to find connected components of unblocked cells
    vector<int> dx = {1,-1,0,0}, dy = {0,0,1,-1};
    vector<vector<int>> comp(N, vector<int>(N, -1));
    vector<vector<int>> comp_vals;
    vector<int> comp_max;
    int comp_cnt = 0;

    for(int i = 0; i < N; i++){
        for(int j = 0; j < N; j++){
            if (A[i][j] != -1 && comp[i][j] == -1){
                queue<pair<int,int>> q;
                q.push({i,j});
                comp[i][j] = comp_cnt;
                comp_vals.emplace_back();
                comp_max.push_back(0);

                while(!q.empty()){
                    auto [x,y] = q.front(); q.pop();
                    int v = A[x][y];
                    comp_vals[comp_cnt].push_back(v);
                    comp_max[comp_cnt] = max(comp_max[comp_cnt], v);

                    for(int d = 0; d < 4; d++){
                        int nx = x + dx[d], ny = y + dy[d];
                        if (nx>=0 && nx<N && ny>=0 && ny<N
                         && A[nx][ny]!=-1 && comp[nx][ny]==-1){
                            comp[nx][ny] = comp_cnt;
                            q.push({nx,ny});
                        }
                    }
                }
                comp_cnt++;
            }
        }
    }

    // if everything is blocked, then every sed-value is -1 => P = N*N * (-1)
    if (comp_cnt == 0){
        ll ans = (- (ll)N * N) % MOD;
        if (ans < 0) ans += MOD;
        cout << ans << "\n";
        return 0;
    }

    // 2) build a global present[] mask and find global_max
    int global_max = 0;
    for(int c = 0; c < comp_cnt; c++){
        global_max = max(global_max, comp_max[c]);
    }
    vector<char> present(global_max+1, 0);
    for(auto &cv: comp_vals)
        for(int v: cv)
            present[v] = 1;

    // 3) total_mult[d] = sum of all grid-values m where m % d == 0
    vector<ll> total_mult(global_max+1, 0);
    for(int d = 1; d <= global_max; d++){
        if (!present[d]) continue;
        for(int m = d; m <= global_max; m += d){
            if (present[m]) total_mult[d] += m;
        }
    }

    // 4) total1 = sum over every unblocked cell u of total_mult[ A[u] ]
    ll total1 = 0;
    for(auto &cv: comp_vals)
        for(int v: cv)
            total1 = (total1 + total_mult[v]) % MOD;

    // 5) total2 = sum over every unblocked cell u of (sum of multiples within its component)
    vector<char> fCi(global_max+1, 0);
    vector<ll> local_mult(global_max+1, 0);
    ll total2 = 0;

    for(int c = 0; c < comp_cnt; c++){
        int Mx = comp_max[c];
        // mark presence in this component
        for(int v: comp_vals[c]){
            fCi[v] = 1;
            local_mult[v] = 0;
        }
        // inner sieve within component
        for(int v: comp_vals[c]){
            ll s = 0;
            for(int m = v; m <= Mx; m += v){
                if (fCi[m]) s += m;
            }
            local_mult[v] = s % MOD;
        }
        // accumulate
        ll csum = 0;
        for(int v: comp_vals[c])
            csum = (csum + local_mult[v]) % MOD;
        total2 = (total2 + csum) % MOD;
        // cleanup
        for(int v: comp_vals[c])
            fCi[v] = 0;
    }

    // 6) unblocked‐cells contribution:
    ll ans = (total1 - total2) % MOD;
    if (ans < 0) ans += MOD;

    // 7) now add the blocked-cells contributions of −1 each
    ans = (ans - blocked_count) % MOD;
    if (ans < 0) ans += MOD;

    cout << ans << "\n";
    return 0;
}
