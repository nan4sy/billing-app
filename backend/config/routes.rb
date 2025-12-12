# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :customers, only: %i[index create show]
    resources :invoices, only: %i[index create show update]
  end
end
