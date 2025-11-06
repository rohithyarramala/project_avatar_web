-- Create AI Agents table
CREATE TABLE IF NOT EXISTS public.ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  data_source TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create conversation threads
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES public.ai_agents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Create messages in conversations
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Create profiles table for additional user details
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type TEXT NOT NULL DEFAULT 'individual',
  company_name TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for ai_agents
CREATE POLICY "users_can_view_own_agents" ON public.ai_agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_can_create_agents" ON public.ai_agents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_can_update_own_agents" ON public.ai_agents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "users_can_delete_own_agents" ON public.ai_agents FOR DELETE USING (auth.uid() = user_id);

-- Policies for conversations
CREATE POLICY "users_can_view_own_conversations" ON public.conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "users_can_create_conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for messages
CREATE POLICY "users_can_view_own_messages" ON public.messages FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.conversations WHERE conversations.id = messages.conversation_id AND auth.uid() = conversations.user_id));
CREATE POLICY "users_can_create_messages" ON public.messages FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.conversations WHERE conversations.id = messages.conversation_id AND auth.uid() = conversations.user_id));

-- Policies for profiles
CREATE POLICY "users_can_view_own_profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_can_update_own_profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users_can_insert_own_profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
