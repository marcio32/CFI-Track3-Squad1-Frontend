export const formatDate = (timestamp) =>{
    const dateObject = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(dateObject);
    return formattedDate;
}
