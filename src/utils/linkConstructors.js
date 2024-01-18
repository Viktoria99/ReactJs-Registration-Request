export function DealUrl(appHost, dealId, dealStateId) {
    return `${appHost}DealForm.aspx?mode=view&iddeal=${dealId}&iddealstate=${dealStateId}`;
}

export function ClientUrl(appHost, clientId) {
    return `${appHost}ClientForm.aspx?idClient=${clientId}&idRequest=&mode=view`;
}

export function ProductUrl(innerAppHost, id) {
    return `${innerAppHost}ProductTest.aspx?id=${id}`;
}

export function ProductClientUrl(innerAppHost, requestId) {
    return `${innerAppHost}ProductRequestTest.aspx?mode=view&id=${requestId}`;
}

