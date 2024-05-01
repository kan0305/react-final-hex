import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/admin/DashBoard';
import AdminProduct from './pages/admin/AdminProduct';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/admin/dashboard' element={<DashBoard />}>
                    {/* 產品列表 */}
                    <Route path='products' element={<AdminProduct />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
