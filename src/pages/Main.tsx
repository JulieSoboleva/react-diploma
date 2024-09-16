import Catalog from '../components/Catalog/Main';
import TopSales from '../components/TopSales';

export default function Main() {
    return (
        <main className='container'>
            <div className='row'>
                <div className='col'>
                    <TopSales />
                    <Catalog />
                </div>
            </div>
        </main>
    );
}
