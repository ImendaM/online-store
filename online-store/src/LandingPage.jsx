import { useEffect, useState } from 'react'

function LandingPage(){

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pants, setPants] = useState(0);
    const [jackets, setJackets] = useState(0);
    const [shoes, setShoes] = useState(0);
    const [caps, setCaps] = useState(0);
    const [shorts, setShorts] = useState(0);
    const [total, setTotal] = useState(0);

    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [visibility, setVisibility] = useState('hidden');

    const cart = [
        {
            title: 'PANTS',
            src: '../public/pants.png',
            price: 15,
            quantity: pants,
        },
        {
            title: 'JACKETS',
            src: '../public/jacket.png',
            price: 45,
            quantity: jackets,
        },
        {
            title: 'SHOES',
            src: '../public/shoes.png',
            price: 60,
            quantity: shoes,
        },
        {
            title: 'CAP',
            src: '../public/cap.png',
            price: 30,
            quantity: caps,
        },
        {
            title: 'SHORTS',
            src: '../public/shorts.png',
            price: 10,
            quantity: shorts,
        }
    ]

    const incrementPants = (price) => {
        setPants((prev) => prev + 1 );
        setTotal((prev) => prev + price);
    };

    const incrementJackets = (price) => {
        setJackets((prev) => prev + 1 );
        setTotal((prev) => prev + price);
    };

     const incrementCaps = (price) => {
        setCaps((prev) => prev + 1 );
        setTotal((prev) => prev + price);
    };

     const incrementShoes = (price) => {
        setShoes((prev) => prev + 1 );
        setTotal((prev) => prev + price);
    };

     const incrementShorts = (price) => {
        setShorts((prev) => prev + 1 );
        setTotal((prev) => prev + price);
    };

    const decrementPants = (price) => {
        setPants((prev) => prev - 1 );
        setTotal((prev) => prev - price);
    };

    const decrementJackets = (price) => {
        setJackets((prev) => prev - 1 );
        setTotal((prev) => prev - price);
    };

     const decrementCaps = (price) => {
        setCaps((prev) => prev - 1 );
        setTotal((prev) => prev - price);
    };

     const decrementShoes = (price) => {
        setShoes((prev) => prev - 1 );
        setTotal((prev) => prev - price);
    };

     const decrementShorts = (price) => {
        setShorts((prev) => prev - 1 );
        setTotal((prev) => prev - price);
    };

    const addItem = (price, item) => {
        if (item === 'PANTS'){
            incrementPants(price);
        } else if (item === 'JACKET'){
            incrementJackets(price);
        } else if (item === 'SHOES'){
            incrementShoes(price);
        } else if (item === 'CAP'){
            incrementCaps(price);
        } else if (item === 'SHORTS'){
            incrementShorts(price);
        }
    }

       const removeItem = (price, item) => {
        if (item === 'PANTS'){
            decrementPants(price);
        } else if (item === 'JACKET'){
            decrementJackets(price);
        } else if (item === 'SHOES'){
            decrementShoes(price);
        } else if (item === 'CAP'){
            decrementCaps(price);
        } else if (item === 'SHORTS'){
            decrementShorts(price);
        }
    }

    const resetAll = () => {
        setTotal(0);
        setPants(0);
        setJackets(0);
        setShoes(0);
        setCaps(0);
        setShorts(0);
    }


    const toggleVisibility = () => {
        if (visibility === 'hidden'){
            setVisibility('block');
        } else {
            setVisibility('hidden');
        }
    }

    useEffect(() => {
        fetch('http://localhost:5000/items').then((res) => res.json()).then((data) => { setItems(data); setLoading(false); })

    }, []);

    if (loading) return <h1 className='text-center mt-10'>Loading...</h1>

    return(
        <>
        <section className='bg-gray-700 flex flex-row items-center justify-between pl-[10px] pr-[10px] pb-[10px] pt-[10px]'>
            <img src="../public/online-store 2 Logo.png" alt="" className='w-[100px] h-[100px]'/>
        </section>
        <section className='flex flex-col'>
            <div className='flex justify-between p-5'>
            {items.map((item) => (
                <div key={item.id} className='bg-gray-300 rounded-md min-w-[250px] flex flex-col items-center justify-center hover:bg-gray-400'>
                    <h1 className='text-3xl'>{item.title}</h1>
                    <img src={item.src} alt="" className='w-[200px] h-[200px]'/>
                    <h1 className='text-2xl'>${item.price}</h1>
                    <button 
                    onClick={() => {addItem(item.price, item.title)}}
                    >
                        <img src="../public/add.png" alt="" className='w-[150px] h-[150px] cursor-pointer hover:w-[160px] hover:h-[160px]'/>
                    </button>
                </div>
            ))}
            </div>
            <button 
            onClick={() => {setIsCheckedOut(false); toggleVisibility();}}
            className='bg-yellow-300 self-center pr-[45px] pl-[45px] pt-[25px] pb-[25px] rounded-md mb-[10px] cursor-pointer hover:bg-yellow-400'>
                Check Out
            </button>
            { isCheckedOut ?
            <div className={`${visibility} fixed right-0 top-0 bg-gray-500 min-w-[500px] pt-[20px] pb-[20px] pl-[20px] pr-[10px] rounded-lg mt-[10px] mr-[10px]`}>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center'>
                        <img src="../public/successful.png" alt="" className='w-[200px] h-[200px]'/>
                        <h2 className='text-white text-2xl pb-[40px]'>Purchase Successful</h2>
                    </div>
                    <button
                    onClick={() => toggleVisibility()}
                    className='bg-red-800 min-w-[200px] text-white rounded-md pt-[10px] cursor-pointer'>
                        Back
                    </button>
                </div>
            </div>
            :
            <div className={`${visibility} fixed right-0 top-0 bg-gray-500 min-w-[500px] pt-[20px] pb-[20px] pl-[20px] pr-[10px] rounded-lg mt-[10px] mr-[10px]`}>
                <h1 className='text-white text-center text-3xl'>Checkout</h1>
                
                    {cart.map((cartItem) => (
                        <div key={cartItem.title} className='flex pt-[20px]'>
                            <img src={cartItem.src} alt="" className='w-[75px] h-[75px] mr-auto'/>
                            <h1 className='ml-auto mr-auto'>{cartItem.title}</h1>
                            <div className='flex'>
                                <button 
                                onClick={() => {addItem(cartItem.price, cartItem.title)}}
                                className='cursor-pointer'>
                                    <img src='../public/add-cart.png' alt="" className='w-[100px] h-[100px]'/>
                                </button>
                                <h1>{cartItem.quantity}</h1>
                                <button 
                                onClick={() => {removeItem(cartItem.price, cartItem.title)}}
                                className='cursor-pointer'>
                                    <img src='../public/subtract-cart.png' alt="" className='w-[100px] h-[100px]'/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-between'>
                    <button 
                    onClick={() => {
                        setIsCheckedOut(true);
                        resetAll();
                    }}
                    className='bg-yellow-300 pr-[20px] pl-[20px] pt-[10px] pb-[10px] rounded-md cursor-pointer'>
                        Purchase
                    </button>
                    <h1 className='text-white text-3xl'>${total}</h1>
                </div>
            </div>
            }
        </section>
        <section className='flex justify-center items-center bg-gray-700'>
            <img src="../public/online-store logo.png" alt="" />
        </section>
        </>
    )
}

export default LandingPage