const fs = require('fs')
const Caver = require('caver-js')

async function testFunction() {
    const caver = new Caver('https://api.baobab.klaytn.net:8651/')
    const caver2 = new Caver('https://public-node-api.klaytnapi.com/v1/cypress')

    const keyring = caver.wallet.keyring.generate()
    // Add to caver.wallet
	caver.wallet.add(keyring)
	
	// Create value transfer transaction
	const vt = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x8084fed6b1847448c24692470fc3b2ed87f9eb47',
		value: caver.utils.toPeb(1, 'KLAY'),
		gas: 25000,
	})

	// Sign to the transaction
	const signed = await caver.wallet.sign(keyring.address, vt)

	// Send transaction to the Klaytn blockchain platform (Klaytn)
	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
	console.log(receipt)
}

testFunction()