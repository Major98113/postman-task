const { parentPort, workerData } = require("worker_threads");

(function mockedMailMassiveCalculation( emailId = '' ) {
    let i = 0;
    setInterval( () => {
        if( parentPort )
            parentPort.postMessage({ emailId, count: ++i });
    }, 500 );
}( workerData.emailId));