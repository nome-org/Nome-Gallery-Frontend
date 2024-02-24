import React, { useState } from 'react'
import { getAddress, signTransaction, signMessage } from "sats-connect";

import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { useUserContext } from "../Context/UserContext";

const TEST_VERSION = false;

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

export default function Body() {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [walletOpen, setWalletOpen] = useState(false);

    if (userSession.isUserSignedIn()) {
        const cardinalAddress = userSession.loadUserData().profile.btcAddress.p2wpkh.mainnet;
        const ordinalAddress = userSession.loadUserData().profile.btcAddress.p2tr.mainnet;
    }

    const {
        paymentAddress,
        setPaymentAddress,
        setOrdinalsAddress,
        setPaymentDerivationPath,
        setOrdinalDerivationPath,
        setUseWallet,
        setPaymentPublicKey,
        setOrdinalsPublicKey,
    } = useUserContext();

    const handleOpen = () => setWalletOpen((cur) => !cur);
    const disconnect = () => {
        setPaymentAddress("");
        setOrdinalsAddress("");
        setPaymentDerivationPath("");
        setOrdinalDerivationPath("");
        setUseWallet(0);
    };

    const connectLeatherWallet = async () => {
        // showConnect({
        //     userSession,
        //     network: StacksMainnet,
        //     appDetails: {
        //         name: 'App Name',
        //         icon: window.location.origin + '/app-icon.png',
        //     },
        //     onFinish: () => {
        //         console.log(
        //             userSession.loadUserData().profile.btcAddress.p2wpkh.mainnet,
        //             userSession.loadUserData().profile.btcAddress.p2tr.mainnet
        //         )
        //     },
        //     onCancel: () => {
        //         // handle if user closed connection prompt
        //     },
        // });

        try {
            const userAddresses = await window.btc?.request('getAddresses');

            const usersNativeSegwitAddress = userAddresses.result.addresses
                .find(address => address.type === 'p2wpkh');

            console.log('usersNativeSegwitAddress ==> ', usersNativeSegwitAddress);

            const addressDetails = await fetch('https://mempool.space/api/address/' + usersNativeSegwitAddress.address);
            console.log('addressDetails ==> ', addressDetails);

            toast.success("Connecting successfully");
        } catch (error) {
            toast.warn("Please install the leather wallet in your browser");
        }
    }

    const connectUnisatWallet = async () => {
        try {
            let accounts = await window.unisat.requestAccounts();
            console.log('connect success', accounts);

            toast.success("Connecting successfully");
        } catch (e) {
            console.log('connect failed');
            toast.warn("Please install the unisat wallet in your browser");
        }
    }

    const connectXverseWallet = async () => {
        try {
            console.log('Xverse wallet connection ==> ')
            const getAddressOptions = {
                payload: {
                    purposes: ["ordinals", "payment"],
                    message: "Address for receiving Ordinals",
                    network: {
                        type: TEST_VERSION ? "Testnet" : "Mainnet",
                    },
                },
                onFinish: (response) => {
                    console.log('response ==> ', response);
                    setOrdinalsAddress(response.addresses[0].address);
                    setOrdinalsPublicKey(response.addresses[0].publicKey);
                    setPaymentAddress(response.addresses[1].address);
                    setPaymentPublicKey(response.addresses[1].publicKey);
                    setUseWallet(1);
                    handleOpen();
                    toast.success("Connecting successfully");
                },
                onCancel: () => {
                    // alert("Request canceled");
                    toast.warn("Connecting canceled");
                },
                onError: () => {
                    toast.warn("Connecting failed with some errors");
                },
            };
            await getAddress(getAddressOptions).catch((err) => {
                toast.error(err.message);
            });
        } catch (error) {
            toast.warn("Please insatll the Xverse wallet!!");
        }
    };

    return (
        <>
            <div className="max-w-4xl px-8 mx-auto mt-12 text-xl italic text-center text-white sm:text-3xl sm:mt-28 font-sans-serif">
                <h2 className="leading-[1.7] tracking-[0.055em]"> Welcome to the NōME gallery – a space for premium 1/1 art and unique digital experiences </h2>
                <h2 className="mt-9 leading-[1.7] tracking-[0.055em]"> $NOME BRC-20 gives access to gallery <br /> exhibitions and art tools. Verify or buy tokens to enter </h2>
            </div>
            <div className="flex flex-col items-center pb-32 mt-16 sm:mt-40" bis_skin_checked="1">
                <div className="flex flex-col gap-4 sm:flex-row" bis_skin_checked="1">
                    <button className="bg-transparent text-white rounded-lg border border-pink-600 transition-all hover:bg-pink-600 pl-6 py-1 pr-4 tracking-[0.3em] disabled:opacity-50 w-32" onClick={onOpenModal}>
                        VERIFY
                    </button>
                    <a href="https://unisat.io/market/brc20?tick=N0ME" target="_blank" className="bg-transparent text-white rounded-lg border border-pink-600 transition-all hover:bg-pink-600 pl-6 py-1 pr-4 tracking-[0.3em] disabled:opacity-50 w-32 text-center"> BUY </a>
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center>
                <div className="flex flex-col items-center w-full max-w-xs p-8 text-black bg-white rounded shadow opacity-90">
                    <h2 className="mb-8 text-3xl italic font-sans-serif">Select a wallet</h2>
                    <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectXverseWallet()}>
                        <img src="/assets/xverse-icon-0bdef1d4.png" className="h-8" /> Xverse
                    </button>
                    <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectUnisatWallet()}>
                        <img src="/assets/unisat-icon-df84ba56.png" className="h-8" /> Unisat
                    </button>
                    <button className="flex items-center w-full px-4 py-2 mb-2 font-semibold transition-all rounded hover:bg-gray-300 gap-x-4" onClick={() => connectLeatherWallet()}>
                        <img src="/assets/leather-icon-9a4d5194.png" className="h-8" /> Leather
                    </button>
                </div>
            </Modal>
            <ToastContainer />
        </>
    )
}
