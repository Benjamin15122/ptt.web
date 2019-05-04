import request from '../utils/request';
import requestText from '../utils/requestText';
export default{
    namespace: "git",
    state: {
    },
    reducers: {
        updateDiff(state, {payload}){
            return {
                ...state,
                diff: payload
            }
        },
        updateCRecord(state, {payload}){
            return {
                ...state,
                c_record: payload
            }
        },
        updateCError(state, {payload}){
            return {
                ...state,
                c_error: payload
            }
        },
        updateAError(state, {payload}){
            return {
                ...state,
                a_error: payload
            }
        },
        updateBError(state, {payload}){
            return {
                ...state,
                b_error: payload
            }
        },
        updateLog(state, {payload}){
            return {
                ...state,
                log: payload
            }
        }
    },
    effects: {
        *fetchDiff({payload},{call,put}){
            const url = "/apis/diff_text?commit1="+payload.commit1+"&commit2="+payload.commit2
            const res = yield call(request,url)

            const urla1 = "/apis/commit_out?sha="+payload.commit1+"&tag=ca"
            const resa1 = yield call(request,urla1)
            if(resa1.Error!==undefined){
                yield put({type: 'updateAError',payload: resa1.error})
                return
            }
            const filepatha = btoa(resa1.files[0])
            const urla2 = "/apis/file?base64="+filepatha
            const resa2 = yield call(request,urla2)

            const urlb1 = "/apis/commit_out?sha="+payload.commit2+"&tag=cb"
            const resb1 = yield call(request,urlb1)
            if(resb1.Error!==undefined){
                yield put({type: 'updateBError',payload: resb1.error})
                return
            }
            const filepathb = btoa(resb1.files[0])
            const urlb2 = "/apis/file?base64="+filepathb
            const resb2 = yield call(request,urlb2)

            yield put({type: 'updateDiff',payload: {
                text: res.diff,
                a_record: {
                    ...resa2,
                    id: payload.commit1
                },
                b_record: {
                    ...resb2,
                    id: payload.commit2
                }
            }})
        },
        *fetchLog(_,{call,put}){
            const url = "/apis/log"
            const response = yield call(requestText,url)
            yield put({type: 'updateLog',payload: response})
        },
        *fetchCommit({payload},{call,put}){
            const url1 = "/apis/commit_out?sha="+payload.sha+"&tag=c"
            const res1 = yield call(request,url1)
            debugger
            if(res1.Error!==undefined){
                yield put({type: 'updateCError',payload: res1.error})
                return
            }
            const filepath = btoa(res1.files[0])
            const url2 = "/apis/file?base64="+filepath
            const res2 = yield call(request,url2)
            yield put({type: 'updateCRecord',payload: res2})
            debugger
        }
    }
}