export function beautyErrMsg(errMsg) {
    const newErrMsg = errMsg.slice(6).toLowerCase();
    return newErrMsg[0].toUpperCase() + newErrMsg.slice(1);
}