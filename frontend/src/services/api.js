const API_URL = "https://vzcjtfer6l.execute-api.eu-north-1.amazonaws.com"

export async function getMessages() {
  const url = `${API_URL}/messages`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch messages');
  }

  const data = await res.json();

  // Säkerställ att createdAt och timestamp alltid finns
  return data.map(post => ({
    id: post.id,
    username: post.username,
    text: post.text,
    createdAt: post.createdAt ?? null,
    timestamp: post.timestamp != null ? Number(post.timestamp) : null
  }));
}

export async function postMessage(message) {
    const url = `${API_URL}/create`;
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
    });

    const textBody = await res.text();

    if (!res.ok) {
        let errorMessage;
        try {
            const json = JSON.parse(textBody);
            errorMessage = json.error || 'Failed to create message';
        } catch {
            errorMessage = textBody || 'Failed to create message';
        }
        throw new Error(errorMessage);
    }

    return JSON.parse(textBody);
}

export async function deleteMessage(id) {
    const url = `${API_URL}/delete/${id}`;
    const res = await fetch(url, {
        method: "DELETE" });
        if(!res.ok) throw new Error('Failed to delete');
        return res.status === 204 ? {} : res.json();
}

export async function updateMessage(id, text) {
    const url = `${API_URL}/update/${id}`;
    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const textBody = await res.text();

    if (!res.ok) {
        let errorMessage;
        try {
            const json = JSON.parse(textBody);
            errorMessage = json.error || 'Failed to update';
        } catch {
            errorMessage = textBody || 'Failed to update';
        }
        throw new Error(errorMessage);
    }

    return JSON.parse(textBody);
}

export async function getMessageByUser(username) {
  if (!username) return [];

  const url = `${API_URL}/messages/${username}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch messages for ${username}`);
  }

  const data = await res.json();

  return data.map(post => ({
    id: post.id,
    username: post.username,
    text: post.text,
    createdAt: post.createdAt ?? null,
    timestamp: post.timestamp != null ? Number(post.timestamp) : null
  }));
}
