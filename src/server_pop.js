module.exports = async function (client, count) {

    async function updateCount () {
        if(count >=0 ){
            client.user.setActivity(`${count} / 120`, { type: 'WATCHING' });
        }
    }

    return await updateCount();
}
