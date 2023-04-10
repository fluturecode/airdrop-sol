import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL
} from '@solana/web3.js'

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)

const getWalletBalance = async() => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const walletBalance = await connection.getBalance(publicKey)
    console.log(`Wallet balance is ${walletBalance}`)
  } catch(err) {
    console.error(err)
  }
}

const airDropSol = async() => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const fromAirDropSignature = await connection.requestAirdrop(publicKey, 3 * LAMPORTS_PER_SOL)
    await connection.confirmTransaction({ signature: fromAirDropSignature })
  } catch(err) {
    console.log(err)
  }
}

const main = async() => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

main()

