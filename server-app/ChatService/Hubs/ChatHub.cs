using ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs;

public class ChatHub : Hub
{
    private readonly string _botUser;

    private readonly IDictionary<string, UserConnection> _userConnections;

    public ChatHub(IDictionary<string, UserConnection> userConnections)
    {
        _botUser = "MyChat Bot";

        _userConnections = userConnections;
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        if (_userConnections.TryGetValue(Context.ConnectionId, out var userConnection))
        {
            _userConnections.Remove(Context.ConnectionId);

            Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left the room.");

            SendConnectedUsers(userConnection.Room);
        }

        return base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(string message)
    {
        if (_userConnections.TryGetValue(Context.ConnectionId, out var userConnection))
        {
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
        }
    }

    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

        _userConnections[Context.ConnectionId] = userConnection;

        await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}");

        await SendConnectedUsers(userConnection.Room);
    }

    public Task SendConnectedUsers(string room)
    {
        var users = _userConnections.Values.Where(c => c.Room == room).Select(c => c.User);

        return Clients.Group(room).SendAsync("UsersInRoom", users);
    }
}
