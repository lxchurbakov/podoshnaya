// start pods that need to be started
// keep track of status here

module.exports = {
    push: (name, content) => {
        console.log('pod push from manager', { name, content })

        // save to app data
    },
    // start
    // stop
    // status
    remove: (name) => {
        // stop the pod
        // remove from app data
    },
};