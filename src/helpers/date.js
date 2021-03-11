export default function dateFormatter(date) {
    return new Date(date).toISOString().slice(0, 10);
}