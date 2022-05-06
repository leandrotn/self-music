const strings = require("../strings.json");
const utils = require("../utils");

module.exports.run = async (client, message, args) => {

    const serverQueue = queue.get("queue");

    if(!serverQueue) return message.channel.send(strings.nothingPlayingVolume);

    if(args.length > 1) return message.channel.send(strings.toMuchArgsVolume);
    if(args.length === 0) return message.channel.send(strings.noVolume);
    
    floatVolume = parseFloat(args);

    if(!Number.isInteger(parseInt(args)) && utils.isFloat(floatVolume)) return message.channel.send(strings.noNumber);

    if(args[0] > 10) return message.channel.send(strings.volumeToHigh);
    
    if(!message.member.voice.channel) return message.channel.send(strings.notInVocal);
        message.channel.send(strings.volumeChanged.replace("VOLUME", args[0]));
    
        serverQueue.volume = floatVolume;
    return serverQueue.connection.dispatcher.setVolumeLogarithmic(floatVolume / 5);

};


module.exports.names = {
    list: ["volume", "v"]
};