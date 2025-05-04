async function getBalance(cardNumber) {
    const payload = { nivelConsulta: 1, tipoConsulta: 2, numExterno: cardNumber };
    try {
        const response = await fetch('https://recaudo.sondapay.com/recaudowsrest/producto/consultaTrx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('HTTP error ' + response.status);
        const data = await response.json();
        const saldo = data.saldo !== undefined ? data.saldo : 'Campo \'saldo\' no encontrado.';
        return saldo;
    } catch (err) {
        return 'Error: ' + err.message;
    }
};

export default getBalance;