// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { AddressForm } from './AddressForm';
import { Field } from '../../../../ui';

describe('Address form', () => {
  let component;
  const props = {
    setField: jest.fn(),
    onSuggest: jest.fn(),
    handleSubmit: jest.fn(),
    error: undefined,
  };

  beforeEach(() => {
    component = shallow(<AddressForm {...props} />);
  });

  it('renders the component', () => {
    expect(component);
  });

  it('renders country field', () => {
    expect(component).toContainReact(
      <Field name="country" label="Country" type="text" />,
    );
  });

  it('renders address line one field', () => {
    expect(component).toContainReact(
      <Field name="addressLineOne" label="Street first line" type="text" />,
    );
  });

  it('renders city field', () => {
    expect(component).toContainReact(
      <Field name="city" label="City" type="text" />,
    );
  });

  it('renders postal code field', () => {
    expect(component).toContainReact(
      <Field name="postalCode" label="Postal Code" type="text" />,
    );
  });
});
