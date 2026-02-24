function Footer() {
    {/* Footer */}
    return (
        <div className="bg-zinc-900 text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                <h3 className="text-xl font-bold mb-4">Address</h3>
                <p className="text-gray-300">
                    Palarivattam, Kochi<br />
                    Kerala - 673501<br />
                    India
                </p>
                </div>
                <div>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <p className="text-gray-300">
                    Phone: +91 98765 43210<br />
                    Email: info@rydo.com<br />
                    24/7 Support Available
                </p>
                </div>
                <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-300">
                    <li><a href="#" className="hover:text-white">About Us</a></li>
                    <li><a href="#" className="hover:text-white">Services</a></li>
                    <li><a href="#" className="hover:text-white">Contact</a></li>
                    <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2026 Rydo. All rights reserved.</p>
            </div>
            </div>
 
         </div>
    )}

export default Footer;