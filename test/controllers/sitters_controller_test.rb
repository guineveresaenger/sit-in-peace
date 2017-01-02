require 'test_helper'

class SittersControllerTest < ActionController::TestCase
  setup do
    @sitter = sitters(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sitters)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sitter" do
    assert_difference('Sitter.count') do
      post :create, sitter: {  }
    end

    assert_redirected_to sitter_path(assigns(:sitter))
  end

  test "should show sitter" do
    get :show, id: @sitter
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @sitter
    assert_response :success
  end

  test "should update sitter" do
    patch :update, id: @sitter, sitter: {  }
    assert_redirected_to sitter_path(assigns(:sitter))
  end

  test "should destroy sitter" do
    assert_difference('Sitter.count', -1) do
      delete :destroy, id: @sitter
    end

    assert_redirected_to sitters_path
  end
end
