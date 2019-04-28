import request from '../utils/request';
export default{
    namespace: "git",
    state: {
        commits: ["nothing","nothing","nothing"],
        diffText: ""
    },
    reducers: {
        updateCommits(state,{payload}){
            return {
                ...state,
                commits: payload
            }
        },
        updateContent(state, {payload}){
            return {
                ...state,
                content: payload
            }
        },
        updateDiff(state, {payload}){
            return {
                ...state,
                diffText: payload
            }
        }
    },
    effects: {
        *fetchCommits({payload},{call,put}){
            const url = "/repos"+payload+"/commits"
            const response = yield call(request,url)
            const commits = response.map(commit=>commit.commit.tree.url)
            yield put({type: 'updateCommits',payload: commits})
        },
        *fetchJson({payload},{call,put}){
            const response = yield call(request,payload)
            const out = response.tree.find(item=>item.path==="out.json")
            if(out===undefined)
                return
            const {url} = out
            const {content} = yield call(request, url)
            const data = JSON.parse(atob(content))
            yield put({type: 'updateContent',payload: data})
        },
        *fetchDiff({payload},{call,put}){
            const url = "/apis/diff_text?commit1="+payload.commit1+"&commit2="+payload.commit2
            const response = yield call(request,url)
            yield put({type: 'updateDiff',payload: response.diff})
        }
    }
}