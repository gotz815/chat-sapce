class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    # respond_to do |format|
    #   format.html
    #   format.json
    # end
  end

  def create
    @message = current_user.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group) }
        format.json
      end
    else
      # @messages = @group.messages.includes(:user)
      redirect_to group_messages_path(@group), notice: 'メッセージを入力してください'
    end
  end
  private

  def message_params
    params.require(:message).permit(:content, :image).merge(group_id: params[:group_id], user_id: params[:user_id])
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end
