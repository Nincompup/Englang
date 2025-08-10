#include <bits/stdc++.h>
using namespace std;

/*
 * Given an array arr, find the maximum greatness achievable by some
 * permutation rearranged of arr, where greatness is the count of
 * indices i for which rearranged[i] > arr[i].
 */
int findMaximumGreatness(vector<int>& arr) {
    int n = arr.size();
    sort(arr.begin(), arr.end());
    
    int wins = 0;
    int j = 0;
    for (int i = 0; i < n; ++i) {
        while (j < n && arr[j] <= arr[i]) {
            ++j;
        }
        if (j == n) break;
        ++wins;
        ++j;
    }
    return wins;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) {
        cin >> x;
    }

    cout << findMaximumGreatness(a) << "\n";
    return 0;
}
