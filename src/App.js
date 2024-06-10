import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminProduct from './pages/admin/AdminProduct';
import DashBoard from './pages/admin/DashBoard';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to='/admin' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<DashBoard />}>
                    {/* 產品列表 */}
                    <Route index element={<Navigate to='products' />} />
                    <Route path='products' element={<AdminProduct />} />
                    <Route path='coupons' element={<AdminCoupons />} />
                    <Route path='orders' element={<div>訂單管理</div>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
