import './App.css';
import { HeroUIProvider, Link, Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getMemes } from './api';
import { setMemes } from './features/memes';
import { Loader } from './components/Loader';
import { MemeList } from './components/MemeList';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MemeTable } from './components/MemeTable';

function App() {
  const memes = useAppSelector(state => state.memes.memes);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const isListPage = location.pathname === '/';
  const isTablePage = location.pathname === '/table/';

  useEffect(() => {
    const savedMemes = localStorage.getItem('memes');

    if (savedMemes) {
      dispatch(setMemes(JSON.parse(savedMemes)));
      setIsLoading(false);
    } else {
      getMemes()
        .then(fetched => {
          dispatch(setMemes(fetched));
          localStorage.setItem('memes', JSON.stringify(fetched));
        })
        .finally(() => setIsLoading(false));
    }
  }, [dispatch]);

  return (
    <HeroUIProvider>
      <Navbar className="relative py-5">
        <NavbarContent>
          <h1 className="text-xl font-bold">AI Brainrot Memes</h1>
        </NavbarContent>
        <NavbarContent className="absolute left-1/2 transform -translate-x-1/2 gap-4 hidden sm:flex">
          <NavbarItem isActive={isListPage}>
            <Link href="/">List</Link>
          </NavbarItem>
          <NavbarItem isActive={isTablePage}>
            <Link aria-current="page" href="/table/">
              Table
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<MemeList memes={memes} />} />
          <Route path="/table/" element={<MemeTable memes={memes} />} />
        </Routes>
      )}
    </HeroUIProvider>
  );
}

export default App;

