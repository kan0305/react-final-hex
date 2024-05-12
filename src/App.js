import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AdminProduct from './pages/admin/AdminProduct';
import DashBoard from './pages/admin/DashBoard';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<DashBoard />}>
                    {/* 產品列表 */}
                    <Route index element={<Navigate to='products' />} />
                    <Route path='products' element={<AdminProduct />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
