import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import YourReactComponent from './YourReactComponent';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/app" element={<YourReactComponent />} />
                {/* 다른 경로들도 추가할 수 있음 */}
            </Routes>
        </Router>
    );
}

export default App;
