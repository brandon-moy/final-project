import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudyOptions from '../components/modal-components/studyoptions';

describe('Tests for ta modal component', () => {
  describe('Tests for the Study Options modal component', () => {
    beforeEach(() => {
      render(
        <StudyOptions />
      );
    });

    test('It should render title for the modal', () => {
      const studyTitle = screen.getByTestId('study-title');

      expect(studyTitle).toBeInTheDocument();
      expect(studyTitle).toHaveTextContent('How would you like to study?');
    });

    test('It should render four different options', () => {
      const studyStandard = screen.getByTestId('study-standard');
      const studyConfidenceAsc = screen.getByTestId('study-confidence-asc');
      const studyConfidenceDesc = screen.getByTestId('study-confidence-desc');
      const studyShuffle = screen.getByTestId('study-shuffle');

      expect(studyStandard).toBeInTheDocument();
      expect(studyConfidenceAsc).toBeInTheDocument();
      expect(studyConfidenceDesc).toBeInTheDocument();
      expect(studyShuffle).toBeInTheDocument();
    });

    test('The different study styles should have appropriate additional parameters in the href (excluding standard)', () => {
      const studyConfidenceAsc = screen.getByTestId('study-confidence-asc');
      const studyConfidenceDesc = screen.getByTestId('study-confidence-desc');
      const studyShuffle = screen.getByTestId('study-shuffle');

      expect(studyConfidenceAsc.href).toContain('order=asc');
      expect(studyConfidenceDesc.href).toContain('order=desc');
      expect(studyShuffle.href).toContain('order=shuffle');

    });
  });
});
