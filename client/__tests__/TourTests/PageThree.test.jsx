import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageThree from '../../components/tour-components/page-three';

describe('Tests for a tour component', () => {
  describe('Tests for Page Three of the tour component', () => {
    beforeEach(() => {
      render(
        <PageThree />
      );
    });

    test('It should render the tour folder and components of the folder', () => {
      const folder = screen.getByTestId('folder');
      const folderName = screen.getByTestId('folder-name');
      const tourPaper = screen.getByTestId('tour-paper');
      const tourFolderTab = screen.getByTestId('tour-folder-tab');
      const tourFolderBack = screen.getByTestId('tour-folder-back');

      expect(folder).toBeInTheDocument();
      expect(folderName).toBeInTheDocument();
      expect(tourPaper).toBeInTheDocument();
      expect(tourFolderTab).toBeInTheDocument();
      expect(tourFolderBack).toBeInTheDocument();
    });

    test('It should render next step instructions after creating a folder', () => {
      const pageThreeInstructions = screen.getByTestId('page-three-instructions');

      expect(pageThreeInstructions).toBeInTheDocument();
      expect(pageThreeInstructions.textContent).toContain('click on the front');
    });
  });
});
