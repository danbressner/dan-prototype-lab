import openai
import random
import spotipy
from dotenv import load_dotenv
from spotipy.oauth2 import SpotifyOAuth

# Load variables from .env file
load_dotenv()

from utils import CLIENT_ID, CLIENT_SECRET, OPENAI_API_KEY, REDIRECT_URI, SCOPE, SPOTIFY_USER, get_completion

# Setup Spotify auth
sp_oauth = SpotifyOAuth(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI, scope=SCOPE)
sp = spotipy.Spotify(auth_manager=sp_oauth)

# Generate a list of artists using the OpenAI API
openai.api_key = OPENAI_API_KEY
artist_prompt = 'Generate a random list of five very popular Japanese rock bands. \
    Only return the name of the artists. Format the list as comma separated values.'
artist_response = get_completion(artist_prompt)
artists = artist_response.split(',')
print(f"List of artists: {artists}")

# Find the most popular songs for each artist
song_uris = []
for artist_name in artists:
    results = sp.search(q=f"artist:{artist_name}", type='artist')['artists']['items']
    if not results:
        print(f"No artist found for {artist_name}.")
    else:
        artist_id = results[0]['id']
        top_tracks = sp.artist_top_tracks(artist_id)['tracks']
        if top_tracks:
            song_uris.extend([track['uri'] for track in top_tracks])
        else:
            print(f"No tracks found for {artist_name}.")

# Create the new public playlist
playlist_prompt = f"Give me a very hipster and cool name for a music playlist. Use my prior prompt on artists for inspiration \
    The artist prompt is denoted by triple backticks ```{artist_prompt}```"
playlist_name = get_completion(playlist_prompt)

playlist_desc = 'A playlist created using the OpenAI & Spotify APIs'
playlist = sp.user_playlist_create(user=SPOTIFY_USER, 
                                   name=playlist_name, 
                                   public=True, 
                                   description=playlist_desc)
playlist_id = playlist['id']

# Add the songs to the playlist
random.shuffle(song_uris)
sp.playlist_add_items(playlist_id, song_uris)

# Print the URL of the playlist
playlist_url = f"https://open.spotify.com/playlist/{playlist_id}"
print(f"Playlist URL: {playlist_url}")
