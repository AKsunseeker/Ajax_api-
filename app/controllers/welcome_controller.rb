class WelcomeController < ApplicationController
  def index
  end

  def product_card
    render(partial: 'product_card', locals: {product: params[:product]})
  end
end
