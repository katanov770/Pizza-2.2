import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../Pagination/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(true);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const category = categoryId > 0 ? `category=${categoryId}` : ``;

  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { searchValue } = useContext(SearchContext);
  const search = searchValue ? `&search=${searchValue}` : ``;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    if (!isSearch.current) {
      axios
        .get(
          `https://6346fa0edb76843976a38c19.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=${sortType.order}${search}`,
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [category, sortType, search, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        order: sortType.order,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, sortType.order, currentPage, navigate]);

  const pizzas = items.map((obj) => {
    return <PizzaBlock key={obj.id} {...obj} />;
  });

  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
