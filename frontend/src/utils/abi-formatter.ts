export const formatABI = (ABI: { [key: string]: any }) => {
    return JSON.parse(JSON.stringify(ABI));
}