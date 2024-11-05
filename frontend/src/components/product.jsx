const Products = () => {
    return ( 
        <>
            <div className="bg-background p-4">         
            
                <main className="mt-6">
                    <h1 className="text-2xl font-bold">Shop</h1>
                    <p className="text-muted-foreground">Showing 1 of 12 results</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    <div className="bg-card p-4 rounded-lg shadow-md">
                        <img src="https://placehold.co/200x200" alt="Men T-Shirt" className="w-full h-32 object-cover rounded-lg" />
                        <h2 className="mt-2 font-semibold">Men T-Shirt</h2>
                        <p className="text-muted-foreground">R800.00</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-md">
                        <img src="https://placehold.co/200x200" alt="Men Baseball Jersey" className="w-full h-32 object-cover rounded-lg" />
                        <h2 className="mt-2 font-semibold">Men Baseball Jersey</h2>
                        <p className="text-muted-foreground">R800.00</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-md">
                        <img src="https://placehold.co/200x200" alt="Men Hoodie" className="w-full h-32 object-cover rounded-lg" />
                        <h2 className="mt-2 font-semibold">Men Hoodie</h2>
                        <p className="text-muted-foreground">R800.00</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-md">
                        <img src="https://placehold.co/200x200" alt="Men T-Shirt" className="w-full h-32 object-cover rounded-lg" />
                        <h2 className="mt-2 font-semibold">Men T-Shirt</h2>
                        <p className="text-muted-foreground">R800.00</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-md">
                        <img src="https://placehold.co/200x200" alt="Men Baseball Jersey" className="w-full h-32 object-cover rounded-lg" />
                        <h2 className="mt-2 font-semibold">Men Baseball Jersey</h2>
                        <p className="text-muted-foreground">R800.00</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-md">
                        <img src="https://placehold.co/200x200" alt="Men Hoodie" className="w-full h-32 object-cover rounded-lg" />
                        <h2 className="mt-2 font-semibold">Men Hoodie</h2>
                        <p className="text-muted-foreground">R800.00</p>
                    </div>
                    </div>
                </main>

            </div>
        </>
     );
}
 
export default Products;