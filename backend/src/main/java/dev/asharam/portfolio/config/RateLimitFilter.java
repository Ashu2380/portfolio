package dev.asharam.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/** In-memory rate limit: 5 POSTs / 10 min per IP on /api/contact. */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

  private static final int MAX_HITS = 5;
  private static final long WINDOW_MS = 10 * 60 * 1000L;
  private final Map<String, Deque<Long>> hits = new ConcurrentHashMap<>();

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    return !("POST".equalsIgnoreCase(request.getMethod())
        && "/api/contact".equals(request.getRequestURI()));
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    String ip = request.getRemoteAddr();
    long now = System.currentTimeMillis();
    Deque<Long> dq = hits.computeIfAbsent(ip, k -> new ArrayDeque<>());
    synchronized (dq) {
      while (!dq.isEmpty() && now - dq.peekFirst() > WINDOW_MS) {
        dq.pollFirst();
      }
      if (dq.size() >= MAX_HITS) {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType("application/json");
        response.getWriter().write("{\"ok\":false,\"error\":\"Too many requests. Try again later.\"}");
        return;
      }
      dq.addLast(now);
    }
    chain.doFilter(request, response);
  }
}
