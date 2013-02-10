IpHeatmap::Application.routes.draw do
  root :to => 'home#index'

  resources :home do
    collection do
      get :geocoded_clicks
    end
  end

end