Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :channels, only: [:index, :show, :create, :destroy]
    resources :videos, only: [:show, :create, :update]
    get 'user/:id', to: 'users#change_theme'
  end


  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
