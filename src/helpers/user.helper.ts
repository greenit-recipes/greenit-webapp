export const getUuidFromId = (id: string) => {
    if (!id) return;
    return Buffer.from(id, 'base64').toString('utf-8').split(':')[1]
}