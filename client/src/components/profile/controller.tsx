import React, { useEffect, useState } from 'react';
import { Profile, User } from '../../types';
import { getPerPage } from './helpers';
import View from './view';

interface StateType {
  allProfiles: Profile[];
  currentPage: number;
  isLoading: boolean;
  selectedColor: string;
  perPage: number;
  totalPages: number;
}

const INITIAL_STATE: StateType = {
  allProfiles: [],
  currentPage: 1,
  isLoading: true,
  selectedColor: '',
  perPage: getPerPage(),
  totalPages: 1,
};

export default function Controller() {
  const [state, setState] = useState<StateType>(INITIAL_STATE);

  const { allProfiles, currentPage, isLoading, selectedColor, perPage } = state;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleProfiles = allProfiles.slice(startIndex, endIndex);

  useEffect(() => {
    const handleResize = () => {
      const newPerPage = getPerPage();
      if (newPerPage !== perPage) {
        const updatedTotalPages = Math.ceil(allProfiles.length / newPerPage);
        const updatedPage = Math.ceil(startIndex / newPerPage) + 1;
        setState((prevState) => ({
          ...prevState,
          currentPage: updatedPage,
          isLoading: true,
          perPage: newPerPage,
          totalPages: updatedTotalPages,
        }));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [allProfiles, currentPage, perPage, startIndex]);

  useEffect(() => {
    fetchUsers();
    const storedColor = localStorage.getItem('selectedColor');
    if (storedColor) {
      setState((prevState) => ({
        ...prevState,
        selectedColor: storedColor,
      }));
    }
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    fetchUsers();
  }, [perPage]);

  const fetchUsers = async () => {
    try {
      const resultsToFetch = perPage;
      const response = await fetch(`https://randomuser.me/api/?results=${resultsToFetch}`);
      const data = await response.json();
      const users = data.results;
      const profileData = users.map((user: User) => ({
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        picture: user.picture.large,
        location: `${user.location.city}, ${user.location.country}`,
      }));
      
      setState((prevState) => ({
        ...prevState,
        allProfiles: [...prevState.allProfiles, ...profileData],
        isLoading: false,
        totalPages: Math.ceil((prevState.allProfiles.length + profileData.length) / perPage),
      }));
    } catch (error) {
      alert('Something went wrong with the request. Try reloading.');
      console.log('Error fetching profiles:', error);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };
  

  const handleArrowClick = (direction: 'previous' | 'next') => {
    setState((prevState) => {
      const { allProfiles, currentPage, totalPages } = prevState;
      let updatedPage;
      let updatedVisibleProfiles: Profile[];

      if (direction === 'previous') {
        updatedPage = currentPage > 1 ? currentPage - 1 : 1;
        const startIndex = (updatedPage - 1) * perPage;
        updatedVisibleProfiles = allProfiles.slice(startIndex, startIndex + perPage);
      } else {
        updatedPage = currentPage < totalPages ? currentPage + 1 : 1;
        updatedVisibleProfiles = allProfiles.slice((updatedPage - 1) * perPage, updatedPage * perPage);
        if (updatedPage === 1) {
          fetchUsers();
        }
      }

      if (updatedPage > currentPage && updatedPage === totalPages) {
        fetchUsers();
      }

      return {
        ...prevState,
        currentPage: updatedPage,
        visibleProfiles: updatedVisibleProfiles,
        isLoading: false,
      };
    });
  };

  const handleBackgroundColor = (color: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedColor: color,
    }));
    localStorage.setItem('selectedColor', color);
  };

  return (
    <div>
      <View
        handleArrowClick={handleArrowClick}
        profiles={visibleProfiles}
        isLoading={isLoading}
        handleBackgroundColor={handleBackgroundColor}
        selectedColor={selectedColor}
        perPage={perPage}
        currentPage={currentPage}
        totalPages={state.totalPages}
      />
    </div>
  );
}
