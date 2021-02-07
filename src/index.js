import { UniversalWebSocket } from 'universal-ws';
(async () => {
    const HOST = `wss://ws.dogechain.info/inv`;

    // Connect when instantiating (unless ConnectionOptions.autoConnect is false)
    const uws = new UniversalWebSocket(HOST);

    uws.open();
    try {
        const response = await uws.sendWithAck('op', 'blocks_sub');

        if (response.msg !== "subscribed") {
            throw new Error("Could not subscribe to websocket.");
        }

        response.on('connected', (msg) => {
            console.log(msg);
        })
    }
    catch (e) {
        console.log(e);
    }
})();